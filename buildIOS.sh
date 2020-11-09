#!/bin/bash
# -*- ENCODING: UTF-8 -*-
DIRECTORIO=/ios
if [ -d "$DIRECTORIO" ]
then
   rm -R ios
fi
ionic cap sync
ionic build
npx cap sync
npx cap add ios
npx cap open android