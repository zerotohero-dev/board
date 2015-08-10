#!/usr/bin/env bash

cd "$( dirname "${BASH_SOURCE[0]}" )"

node ../board-job-runner.js &
node ../board-pipe.js &
node ../board-web.js &

echo "TODO: further instructions here."
