import os

bind = ':8000'
workers = 5
threads = 4
timeout = 300
if os.environ.get('DEBUG') == 'true':
    log_level = 'debug'
