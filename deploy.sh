#!/bin/bash
# Deploy script — bypasses VPN/proxy SSL issue
export NODE_TLS_REJECT_UNAUTHORIZED=0
npm run build && npx wrangler pages deploy dist/client --project-name kuis-pramuka --commit-dirty=true

