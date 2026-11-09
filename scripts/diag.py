import json,sys
sys.path.insert(0,'scripts')
from common import *
import requests
c=cfg();tok=get_token();h=graph_host();v=c['graph_version'];acc=c['account_id']
def g(path,**p):
    r=requests.get(f"{h}/{v}/{path}",params={**p,"access_token":tok},timeout=60);print(path.split('/')[-1][:20],r.status_code,r.text[:600].replace(tok,'***'))
g(f"{acc}/content_publishing_limit",fields="quota_usage,config")
g(f"{acc}",fields="username,media_count,followers_count")
L=load_ledger()
for r in L['rows'][-4:]:
    if r.get('container'):g(r['container'],fields="status_code,status")
