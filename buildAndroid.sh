#!/bin/bash
# -*- ENCODING: UTF-8 -*-
ionic cap sync
ionic build
npx cap sync
npx cap add android
npx cap open android