#!/bin/bash

OUTPUT_FILE="project_files.txt"
ROOT_DIR="$(pwd)"
EXCLUDE_FILES=("package-lock.json" "$OUTPUT_FILE" ".DS_Store" ".gitignore" "list-files.sh")
EXCLUDE_FOLDERS=("public" "node_modules" "dist" ".idea" ".git")

# Clear the output file
> "$OUTPUT_FILE"

# Function to append file contents to the output file
append_file() {
    local file="$1"
    if [[ -f "$file" ]]; then
        echo "Reading: $file"
        echo "=== $file ===" >> "$OUTPUT_FILE"
        echo "" >> "$OUTPUT_FILE"
        cat "$file" >> "$OUTPUT_FILE"
        echo -e "\n\n" >> "$OUTPUT_FILE"
    fi
}

# Construct find command with exclusions
find "$ROOT_DIR" -type d \( -name "${EXCLUDE_FOLDERS[0]}" -o -name "${EXCLUDE_FOLDERS[1]}" -o -name "${EXCLUDE_FOLDERS[2]}" -o -name "${EXCLUDE_FOLDERS[3]}" -o -name "${EXCLUDE_FOLDERS[4]}" \) -prune -o -type f \( ! -name "${EXCLUDE_FILES[0]}" ! -name "${EXCLUDE_FILES[1]}" ! -name "${EXCLUDE_FILES[2]}" ! -name "${EXCLUDE_FILES[3]}" ! -name "${EXCLUDE_FILES[4]}" \) -print | while read -r file; do
    append_file "$file"
done

echo "File list written to $OUTPUT_FILE"