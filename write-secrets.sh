#!/bin/bash
if [ -z "$BREEZ_API_KEY" ]; then
    echo "BREEZ_API_KEY expected"
    exit 1
fi
echo "BREEZ_API_KEY=$BREEZ_API_KEY" > ios/Secrets.xconfig
echo "BREEZ_API_KEY=$BREEZ_API_KEY" >> android/app/gradle.properties
