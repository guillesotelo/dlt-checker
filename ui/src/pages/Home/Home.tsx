import { useState, DragEvent, useEffect, useRef } from "react";
import styles from "./home.module.scss";
import { dataObj, entryType, FlaggedEntry, SummaryRow } from "../../types";
import { DotLoader, GridLoader } from "react-spinners";
import Dropdown from "../../components/Dropdown/Dropdown";
import { parseFlaggedEntries } from "../../helpers";
import { LoaderBlock } from "../../components/LoaderBlock/LoaderBlock";

type UploadResponse = {
  file_id: string;
  filename: string;
};

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [fileId, setFileId] = useState<string | null>(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [analyzeLoading, setAnalyzeLoading] = useState(false);
  const [maskLoading, setMaskLoading] = useState(false);
  const [result, setResult] = useState<dataObj | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filterOptions, setFilterOptions] = useState<string[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('');
  const [entryBlocks, setErntryBlocks] = useState<entryType[]>([]);
  const apiURl = process.env.REACT_APP_SERVER_URL
  const fileUploadRef = useRef<HTMLInputElement | null>(null)

  // useEffect(() => {
  //   const testLogs = JSON.parse(localStorage.getItem('testLogs') || '{}')
  //   if (testLogs.summaryClass) setResult(testLogs)
  // }, [])

  useEffect(() => {
    if (result && result.summaryRows) {
      getLogFilters()
      setErntryBlocks(result.entryBlocks)
    }
  }, [result])

  useEffect(() => {
    if (result && result.entryBlocks) {
      setErntryBlocks(result.entryBlocks.filter((entry: entryType) => ((entry.findings || [])
        .map(f => f.entity_type).includes(selectedFilter))))
    }
  }, [selectedFilter])

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files[0];
    if (dropped && dropped.name.toLowerCase().endsWith(".dlt")) {
      setFile(dropped);
      setError(null);
      uploadFile(dropped)
    } else {
      setError("Please upload a valid .dlt file");
    }
  };

  const getLogFilters = () => {
    if (!result || !result.summaryRows) return
    const filters = [...new Set(result.summaryRows.map((row: SummaryRow) => row.entity_type))] as string[]
    setFilterOptions(filters)
    if (filters[0]) setSelectedFilter(filters[0])
  }

  const uploadFile = async (file: any) => {
    if (!file) {
      setError("No file selected");
      return;
    }

    setUploadLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`${apiURl}/api/upload-dlt`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data: UploadResponse = await res.json();
      setFileId(data.file_id);
      setUploadLoading(false);
    } catch (err) {
      setUploadLoading(false);
      setError("Error uploading file");
    }
  };

  const analyzeFile = async (fileId: string) => {
    if (!fileId) {
      setError("File must be uploaded first");
      return;
    }

    setAnalyzeLoading(true);
    setError(null);

    try {
      const res = await fetch(`${apiURl}/api/process-dlt/${fileId}`);

      if (!res.ok) throw new Error("Processing failed");

      const flaggedEntries: FlaggedEntry[] = await res.json();

      const reportData = parseFlaggedEntries(flaggedEntries);

      console.log(reportData)
      setResult(reportData);

      setAnalyzeLoading(false);
    } catch (err) {
      setAnalyzeLoading(false);
      setError("Error analyzing file");
    }
  };

  const maskAndDownload = async () => {
    if (!fileId) {
      setError("File must be uploaded first");
      return;
    }

    setMaskLoading(true);
    setError(null);

    try {
      const res = await fetch(`${apiURl}/api/mask-dlt/${fileId}`);

      if (!res.ok) {
        setError('File not found. Note that files are removed after 1 hour.')
        throw new Error("Masking failed");
      }

      const blob = await res.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      const disposition = res.headers.get("Content-Disposition");
      let filename = `${fileId}_masked.dlt`;
      if (disposition && disposition.includes("filename=")) {
        const match = disposition.match(/filename="?(.+)"?/);
        if (match && match.length > 1) filename = match[1];
      }

      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);

      setMaskLoading(false);
    } catch (err) {
      console.error(err);
      setMaskLoading(false);
      setError("Error masking file. Please try again.");
    }
  };

  const getTotalMatches = () => {
    if (!result) return null;
    let count = 0;
    (result.summaryRows || []).forEach((row: SummaryRow) => count += (row.count || 0));
    return count;
  }

  const analyzerLoader = () => {
    return (
      <div className={styles.loaderRow}>
        <div className={styles.loaderCol} style={{ width: '40vw', alignItems: 'flex-end' }}>
          {LoaderBlock('dark', '10vh')}
          {LoaderBlock('dark', '7vh')}
          {LoaderBlock('dark', '3vh')}
          {LoaderBlock('dark', '3vh')}
          {LoaderBlock('dark', '3vh')}
          {LoaderBlock('dark', '3vh')}
          {LoaderBlock('dark', '3vh')}
          {LoaderBlock('dark', '3vh')}
          {LoaderBlock('dark', '3vh')}
          {LoaderBlock('dark', '3vh')}
          {LoaderBlock('dark', '3vh')}
          {LoaderBlock('dark', '3vh')}
        </div>
        <div className={styles.loaderCol} style={{ width: '45vw', alignItems: 'flex-start' }}>
          {LoaderBlock('dark', '7vh')}
          {LoaderBlock('dark', '17vh')}
          {LoaderBlock('dark', '15vh')}
          {LoaderBlock('dark', '15vh')}
          {LoaderBlock('dark', '9vh')}
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <h1 style={{ marginTop: 0 }}>DLT - GDPR Compliance</h1>
      {!result && !analyzeLoading && <p className={styles.intro}>
        This tool allows you to upload automotive <strong>.dlt</strong> (Diagnostic Log and Trace) files and
        analyze them for GDPR-related sensitive information exposure.
      </p>}

      {uploadLoading ? <div className={styles.loader}><DotLoader speedMultiplier={.8} size={50} color="#d3d3d3" />Uploading {file?.name}...</div>
        : analyzeLoading ? <div className={styles.loader}><span>Analyzing DLT logs in <strong>{file?.name || 'file'}</strong><br/>This might take one or two minutes...</span> 
          {analyzerLoader()}
        </div>
          : ''
      }

      {fileId && !result && !analyzeLoading ? <span><strong>✅ File uploaded: </strong></span> : ''}
      {result ? <span><strong>✅ Analysis completed for: </strong></span> : ''}
      {!uploadLoading && !analyzeLoading && file ? <span>{file.name}</span> : ''}
      <div
        className={styles.dropzone}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        style={{ display: uploadLoading || analyzeLoading || fileId || result ? 'none' : '' }}>
        Drag & Drop your .dlt file here or click to select
        <input
          type="file"
          accept=".dlt"
          className={styles.fileInput}
          ref={fileUploadRef}
          onChange={(e) => {
            const selected = e.target.files?.[0];
            if (selected && selected.name.endsWith(".dlt")) {
              setFile(selected);
              setError(null);
              uploadFile(selected)
            } else {
              setError("Please upload a valid .dlt file");
            }
          }} />
      </div>

      {file && !uploadLoading && !analyzeLoading && !result &&
        <div className={styles.actions}>
          {/* <button
          className={styles.btn}
          onClick={uploadFile}
          disabled={!file || uploadLoading}
        >
          {uploadLoading ? "Uploading…" : "Upload"}
        </button> */}
          <button
            className={styles.btn}
            onClick={() => fileId ? analyzeFile(fileId) : null}
            style={{ marginTop: '1rem' }}
          >
            Analyze for GDPR compliance
          </button>
        </div>}

      {error && <div className={styles.error}>{error}</div>}

      {!uploadLoading && !analyzeLoading && result ?
        <div className="analyzer-container">
          <div className={`summary-container${result.summaryClass || ''}`}>
            <div className='summary'>
              <h2 style={{ marginTop: 0 }}>GDPR Compliant: {result.gdprMessage}</h2>
              {getTotalMatches() ? <p className="summary-total">Total flagged logs: <strong>{getTotalMatches()}</strong></p> : ''}
              <table>
                <thead>
                  <tr>
                    <th>Entity Type</th>
                    <th>Severity</th>
                    <th>Matches</th>
                  </tr>
                </thead>
                <tbody>
                  {(result.summaryRows || []).map((row: dataObj, i: number) =>
                    <tr
                      key={i}
                      className={`entity-row${selectedFilter === row.entity_type ? '--selected' : ''}`}
                      onClick={() => maskLoading ? null : setSelectedFilter(row.entity_type)}>
                      <td className="entity-type">{row.entity_type}</td>
                      <td className={`sev-label-${row.severity}`}>{row.severity.toUpperCase()}</td>
                      <td>{row.count}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="entries-container">
            <div className="entries-filters">
              {maskLoading ? '' : <Dropdown
                label="Filter results"
                options={filterOptions}
                selected={selectedFilter}
                value={selectedFilter}
                setSelected={setSelectedFilter}
                style={{ minWidth: '20rem' }}
              />}
              <button className={styles.downloadBtn} onClick={maskAndDownload} disabled={maskLoading}>Mask & download</button>
              <button
                className={styles.btn}
                onClick={() => {
                  setResult(null)
                  setFile(null)
                  setFileId(null)
                  fileUploadRef.current?.click()
                }}
                disabled={maskLoading}
              >Upload new file</button>
            </div>
            <div className="entries-list">
              {maskLoading ? <div className={styles.loader}><GridLoader speedMultiplier={.5} size={25} color="#d3d3d3" />Masking {getTotalMatches()} DLT entries...</div>
                : entryBlocks.map((entry: entryType, i: number) =>
                  <div key={i} className={`entry sev-${entry.highestSev}`}>
                    <h3 style={{ marginTop: 0 }}>{`${entry.timestamp} -> Severity: ${(entry.highestSev || '').toUpperCase()}`}</h3>
                    <pre style={{ marginBottom: '.5rem' }}>{entry.payload}</pre>
                    <pre>{entry.findings?.map((f, j) =>
                      <pre key={j}><strong className={`entry-finding-sev-${f.severity}`}>
                        {f.entity_type}</strong> ({f.severity.toUpperCase()}): {f.entity_type.includes('SENSITIVE_COMBO') ? <div dangerouslySetInnerHTML={{ __html: f.value }} />
                          : f.value}
                      </pre>)}
                    </pre>
                  </div>)}
            </div>
          </div>
        </div>
        : ''}
      <p
        className={styles.footer}
        style={{
          position: result ? 'unset' : 'absolute',
          marginTop: result ? '.5rem' : '',
        }}>This application is in development. All uploaded files are being processed internally and deleted after one hour.</p>
    </div >
  );
};
