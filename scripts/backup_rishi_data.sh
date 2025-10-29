#!/bin/bash

# Rishi Hymns Data Backup Script
# This script creates timestamped backups of the Rishi hymns data files

# Set the backup directory
BACKUP_DIR="./backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

echo "🕊️ Creating backup of Rishi Hymns data..."
echo "📅 Timestamp: $TIMESTAMP"

# Backup basic Rishi hymns data
if [ -f "./dataset/rishi_hymns.json" ]; then
    cp "./dataset/rishi_hymns.json" "$BACKUP_DIR/rishi_hymns_$TIMESTAMP.json"
    echo "✅ Backed up rishi_hymns.json"
else
    echo "❌ rishi_hymns.json not found"
fi

# Backup comprehensive Rishi hymns data
if [ -f "./dataset/comprehensive_rishi_hymns.json" ]; then
    cp "./dataset/comprehensive_rishi_hymns.json" "$BACKUP_DIR/comprehensive_rishi_hymns_$TIMESTAMP.json"
    echo "✅ Backed up comprehensive_rishi_hymns.json"
else
    echo "❌ comprehensive_rishi_hymns.json not found"
fi

# Backup TypeScript types
if [ -f "./src/types/rishiHymns.ts" ]; then
    cp "./src/types/rishiHymns.ts" "$BACKUP_DIR/rishiHymns_types_$TIMESTAMP.ts"
    echo "✅ Backed up rishiHymns.ts"
else
    echo "❌ rishiHymns.ts not found"
fi

# Backup utility functions
if [ -f "./src/utils/rishiHymnsData.ts" ]; then
    cp "./src/utils/rishiHymnsData.ts" "$BACKUP_DIR/rishiHymnsData_utils_$TIMESTAMP.ts"
    echo "✅ Backed up rishiHymnsData.ts"
else
    echo "❌ rishiHymnsData.ts not found"
fi

# Create a summary file
cat > "$BACKUP_DIR/backup_summary_$TIMESTAMP.txt" << EOF
Rishi Hymns Data Backup Summary
===============================
Timestamp: $TIMESTAMP
Date: $(date)

Files Backed Up:
- rishi_hymns.json
- comprehensive_rishi_hymns.json
- rishiHymns.ts (types)
- rishiHymnsData.ts (utils)

Backup Location: $BACKUP_DIR/
Total Files: $(ls -1 "$BACKUP_DIR"/*_$TIMESTAMP.* | wc -l)

Notes:
- This backup contains all Rishi hymns data files
- Use these files to restore data if needed
- Keep backups for version control and rollback purposes
EOF

echo "📋 Created backup summary: backup_summary_$TIMESTAMP.txt"
echo "🎉 Backup completed successfully!"
echo "📁 Backup location: $BACKUP_DIR/"
echo "📊 Total backup files: $(ls -1 "$BACKUP_DIR"/*_$TIMESTAMP.* | wc -l)"
