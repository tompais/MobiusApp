#!/bin/bash
# -*- ENCODING: UTF-8 -*-
ionic cap sync
ionic build
npx cap sync
npx cap add ios
npx cap open android