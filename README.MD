# GDPR Compliance Analyzer for DLT Logs (Automotive)

Analyzer of DLT (Diagnostic Log and Trace) logs using custom regex checkers.

## Features

- Severity scoring
- Parallel processing (multiprocessing) for large DLT batches
- CLI
- HTML compliance report generation
- Full improved custom setup + recognizers

### Detectors

- IP addresses
- Email addresses
- Phone numbers
- VIN
- MAC addresses
- UUIDs
- GPS coordinates
- Credit card numbers
- Person names
- Device IDs / serial-like tokens
- Alcohol
- Biometrics
- DMS / OMS
- Speeding
- Safety Events
- Violations
- Camera
- Behavioral State

## How to

### DLT format parsing

In order to analyse raw DLT logs, we need to parse them into JSON:

1. Install dependencies

```bash
    pip install json pydlt re tqdm multiprocessing
```

2. Convert DLT file to JSON for processing

```bash
    python convert_dlt_to_json.py --input path/to/logs.dlt
```

### Run

1. Run the GDPR scan

```bash
    python gdpr_scan_regex.py --input input/logs.json --output output/flagged.json
```

2. Open the HTML report

It contains:

- Summary with compliance flags
- Findings with highlighted severity (red/yellow/blue) direct and combined
