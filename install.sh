#!/bin/bash
project_dir="scrapaddon"
vendor_dir="${project_dir}/vendor"

# Define array to store sources links
declare -a sources_links
sources_links=(
    "https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"
    "https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
)

# Create vendor directory if it doesn't exist
if [ ! -d "$vendor_dir" ]; then
    echo "Creating vendor directory..."
    mkdir $vendor_dir
fi

for link in "${sources_links[@]}"
do
    filename=$(basename $link)

    echo "Downloading $filename..."
    curl -o $vendor_dir/$filename $link

    # Check if download was successful
    if [ $? -eq 0 ]; then
        echo "Download of $filename successful!"
    else
        echo "Download of $filename failed."
    fi
done
