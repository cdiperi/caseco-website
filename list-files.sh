#!/bin/bash

OUTPUT_FILE="project_files.txt"
MAIN_APP_FILE="src/App.jsx"
INCLUDE_FOLDERS=("src/components" "src/pages")

# Clear the output file
> "$OUTPUT_FILE"

# Function to append file contents to the output file
append_file() {
    local file="$1"
    if [[ -f "$file" ]]; then
        echo "=== $file ===" >> "$OUTPUT_FILE"
        echo "" >> "$OUTPUT_FILE"
        cat "$file" >> "$OUTPUT_FILE"
        echo -e "\n\n" >> "$OUTPUT_FILE"
    fi
}

# Append main App file
append_file "$MAIN_APP_FILE"

# Append all files from specified folders
for folder in "${INCLUDE_FOLDERS[@]}"; do
    if [[ -d "$folder" ]]; then
        find "$folder" -type f | while read -r file; do
            append_file "$file"
        done
    fi
done

echo "File list written to $OUTPUT_FILE"

