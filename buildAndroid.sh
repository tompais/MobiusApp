#!/bin/bash
# -*- ENCODING: UTF-8 -*-
DIRECTORIO=/android

if [ -d "$DIRECTORIO" ]
then
   rm -R android
fi
ionic cap sync
ionic build
npx cap sync
npx cap add android
npx cap open android