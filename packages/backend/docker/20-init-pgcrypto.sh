#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" -c "CREATE EXTENSION pgcrypto;" fund
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" -c "CREATE EXTENSION pgcrypto;" fund-test
