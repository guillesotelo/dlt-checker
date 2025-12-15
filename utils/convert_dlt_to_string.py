from pydlt import DltFileReader
import re

input_file = "DLT_DIR.dlt"
output_file = "DLT_DIR.txt"

def parse_logs(input_file, output_file):
    # Open DLT file using proper parser
    logs = ''
    with DltFileReader(input_file) as reader:
        for msg in reader:
            # msg is a DltMessage
            # Use msg.__str__() or str(msg) to get the verbose string
            verbose_str = str(msg)

            # Example: parse the timestamp at the start (YYYY/MM/DD HH:MM:SS.ssssss)
            ts_match = re.match(r'^(\d{4}/\d{2}/\d{2} \d{2}:\d{2}:\d{2}\.\d+)', verbose_str)
            timestamp = ts_match.group(1) if ts_match else None
            
            if " verbose 1 " in verbose_str:
                payload = verbose_str.split(" verbose 1 ", 1)[1].strip()
            else:
                payload = None  # fallback if "log" not found

            logs += f"{timestamp}: {payload}\n"
            
        # Save as string
    with open(output_file, "w") as f:
        f.write(logs)

if __name__ == '__main__':
    parse_logs(input_file, output_file)