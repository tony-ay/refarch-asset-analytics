kubectl config set-cluster green-cluster --server=https://169.47.77.137:8001 --insecure-skip-tls-verify=true
kubectl config set-context green-cluster-context --cluster=green-cluster
kubectl config set-credentials admin --token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiZHExc2x1enM5b2RtMDlrdjVoemIiLCJyZWFsbU5hbWUiOiJjdXN0b21SZWFsbSIsInVuaXF1ZVNlY3VyaXR5TmFtZSI6ImFkbWluIiwiaXNzIjoiaHR0cHM6Ly9teWNsdXN0ZXIuaWNwOjk0NDMvb2lkYy9lbmRwb2ludC9PUCIsImF1ZCI6Ijk5ZmI2YzdjYmE0NDYwNjIxYmUzYzlmZDZjMzU1NTAzIiwiZXhwIjoxNTMxMjAzMTMyLCJpYXQiOjE1MzExNzQzMzIsInN1YiI6ImFkbWluIiwidGVhbVJvbGVNYXBwaW5ncyI6W119.kK39jham54LkzEqiYU9BJTACFtW1nxIJcuTXB9wEz_8z2v1rmbp9n7eKBWxPWeDS-Zzk7xOjxlGAdJGRJGPYd3D_9hgpNb0OgkC7s2g_LKyXeOpLZPlTIQcEbWRKr6aWNjTZb9LcHnl72yQ9CCCOZaGe4jzY7VBWEG67j1W1axd0UJbaRTAcbSGehwy7bC4ZUzQi82QGd5G_AQeUUuTFgDL29yhE6z4WZIdtqEEXUHZDHxoAWeIi61AAnUPwEKKD7fG580Y-A8GPOPPsuACqkHZIyTkRfsb02m6twUYzg3DcXJhmPOE5eaqWUMVyVrOemDEPgasq413A0e8crG9Ptg
kubectl config set-context green-cluster-context --user=admin --namespace=greencompute
kubectl config use-context green-cluster-context
