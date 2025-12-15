# GDPR Compliance Analyser for DLT Logs (Automotive)

Analyser of DLT logs using custom analysers and JSON as input.


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
    pip install json pydlt re
```

2. Convert DLT to JSON (update input & output paths, if needed)

```bash
    python convert_dlt_to_json.py
```

### Run

1. Install dependencies

```bash
    pip install re tqdm multiprocessing
```

2. Run the GDPR scan

```bash
    python gdpr_scan_regex.py --input input/dlt_logs.json --output output/flagged.json
```

3. Open the HTML report

It contains:

- Summary with compliance flags
- Findings with highlighted severity (red/yellow/blue)
