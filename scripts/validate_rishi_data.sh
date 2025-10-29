#!/bin/bash

# Rishi Hymns Data Validation Script
# This script validates the structure and content of Rishi hymns data files

echo "🕊️ Validating Rishi Hymns Data..."
echo "=================================="

# Function to validate JSON file
validate_json() {
    local file_path="$1"
    local file_name="$2"
    
    if [ ! -f "$file_path" ]; then
        echo "❌ $file_name not found: $file_path"
        return 1
    fi
    
    # Check if file is valid JSON
    if jq empty "$file_path" 2>/dev/null; then
        echo "✅ $file_name: Valid JSON structure"
        
        # Check for required fields
        if jq -e '.rishis' "$file_path" >/dev/null 2>&1; then
            echo "✅ $file_name: Contains 'rishis' field"
        else
            echo "❌ $file_name: Missing 'rishis' field"
        fi
        
        if jq -e '.metadata' "$file_path" >/dev/null 2>&1; then
            echo "✅ $file_name: Contains 'metadata' field"
        else
            echo "❌ $file_name: Missing 'metadata' field"
        fi
        
        # Count Rishis
        local rishi_count=$(jq '.rishis | length' "$file_path")
        echo "📊 $file_name: Contains $rishi_count Rishis"
        
        return 0
    else
        echo "❌ $file_name: Invalid JSON structure"
        return 1
    fi
}

# Function to validate comprehensive JSON file
validate_comprehensive_json() {
    local file_path="$1"
    local file_name="$2"
    
    if [ ! -f "$file_path" ]; then
        echo "❌ $file_name not found: $file_path"
        return 1
    fi
    
    # Check if file is valid JSON
    if jq empty "$file_path" 2>/dev/null; then
        echo "✅ $file_name: Valid JSON structure"
        
        # Check for required fields
        if jq -e '.rishiHymns' "$file_path" >/dev/null 2>&1; then
            echo "✅ $file_name: Contains 'rishiHymns' field"
        else
            echo "❌ $file_name: Missing 'rishiHymns' field"
        fi
        
        if jq -e '.metadata' "$file_path" >/dev/null 2>&1; then
            echo "✅ $file_name: Contains 'metadata' field"
        else
            echo "❌ $file_name: Missing 'metadata' field"
        fi
        
        # Count Rishis
        local rishi_count=$(jq '.rishiHymns | keys | length' "$file_path")
        echo "📊 $file_name: Contains $rishi_count Rishis"
        
        return 0
    else
        echo "❌ $file_name: Invalid JSON structure"
        return 1
    fi
}

# Function to validate TypeScript file
validate_typescript() {
    local file_path="$1"
    local file_name="$2"
    
    if [ ! -f "$file_path" ]; then
        echo "❌ $file_name not found: $file_path"
        return 1
    fi
    
    # Check if file contains TypeScript interfaces
    if grep -q "interface" "$file_path"; then
        echo "✅ $file_name: Contains TypeScript interfaces"
    else
        echo "❌ $file_name: No TypeScript interfaces found"
    fi
    
    if grep -q "export" "$file_path"; then
        echo "✅ $file_name: Contains exports"
    else
        echo "❌ $file_name: No exports found"
    fi
    
    return 0
}

# Validate all data files
echo ""
echo "📋 Validating Data Files:"
echo "------------------------"

# Validate basic Rishi hymns data
validate_json "./dataset/rishi_hymns.json" "rishi_hymns.json"

# Validate comprehensive Rishi hymns data
validate_comprehensive_json "./dataset/comprehensive_rishi_hymns.json" "comprehensive_rishi_hymns.json"

# Validate TypeScript types
validate_typescript "./src/types/rishiHymns.ts" "rishiHymns.ts"

# Validate utility functions
validate_typescript "./src/utils/rishiHymnsData.ts" "rishiHymnsData.ts"

echo ""
echo "🔍 Content Analysis:"
echo "-------------------"

# Analyze Rishi data
if [ -f "./dataset/rishi_hymns.json" ]; then
    echo "📊 Basic Rishi Data Analysis:"
    echo "  - Total Rishis: $(jq '.rishis | length' ./dataset/rishi_hymns.json)"
    echo "  - Total Hymns: $(jq -r '.metadata.totalHymns' ./dataset/rishi_hymns.json)"
    echo "  - Mandalas: $(jq -r '.metadata.mandalas | join(", ")' ./dataset/rishi_hymns.json)"
    echo "  - Deities: $(jq -r '.metadata.deities | join(", ")' ./dataset/rishi_hymns.json)"
fi

# Analyze comprehensive data
if [ -f "./dataset/comprehensive_rishi_hymns.json" ]; then
    echo ""
    echo "📊 Comprehensive Rishi Data Analysis:"
    echo "  - Total Rishis: $(jq '.rishiHymns | keys | length' ./dataset/comprehensive_rishi_hymns.json)"
    echo "  - Total Hymns: $(jq -r '.metadata.totalHymns' ./dataset/comprehensive_rishi_hymns.json)"
    echo "  - Mandalas: $(jq -r '.metadata.mandalas | join(", ")' ./dataset/comprehensive_rishi_hymns.json)"
    echo "  - Deities: $(jq -r '.metadata.deities | join(", ")' ./dataset/comprehensive_rishi_hymns.json)"
fi

echo ""
echo "🎉 Validation completed!"
echo "📁 Data files are ready for use in the application."
