#!/bin/bash

# Set target size in bytes (3MB = 3 * 1024 * 1024)
target_size=$((3 * 1024 * 1024))

# Function to convert bytes to human-readable format
human_readable() {
    local bytes=$1
    if [ $bytes -lt 1024 ]; then
        echo "${bytes}B"
    elif [ $bytes -lt $((1024 * 1024)) ]; then
        echo "$((bytes / 1024))KB"
    else
        echo "$((bytes / 1024 / 1024))MB"
    fi
}

# Get total number of jpg files for progress tracking
total_files=$(ls RAW/*.jpg 2>/dev/null | wc -l)
current_file=0

# Process each jpg file in the RAW directory
for input_file in RAW/*.jpg; do
    # Skip if no jpg files found
    [ -e "$input_file" ] || continue
    
    # Get base filename
    filename=$(basename "$input_file")
    output_file="compressed_${filename}"
    ((current_file++))
    
    echo "Processing ($current_file/$total_files): $filename"
    
    # Start with quality 95 and reduce if necessary
    quality=95
    
    # Copy original file first
    cp "$input_file" "$output_file"
    
    while true; do
        # Get current file size
        current_size=$(stat -f%z "$output_file")
        
        # Break if file is already under target size
        if [ $current_size -le $target_size ]; then
            echo "✓ Final size: $(human_readable $current_size) (Quality: $quality)"
            break
        fi
        
        # Reduce quality and try again
        ((quality-=5))
        
        # Give up if quality gets too low
        if [ $quality -lt 5 ]; then
            echo "⚠️  Warning: Could not achieve target size even at lowest quality"
            break
        fi
        
        echo "  Trying quality $quality (Current size: $(human_readable $current_size))"
        
        # Compress the image with new quality setting
        magick "$input_file" -quality $quality -strip "$output_file"
    done
    
    echo ""
done

echo "Compression complete! Processed $total_files files."

