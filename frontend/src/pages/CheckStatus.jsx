import React, {useState} from 'react'
import { checkStatus } from '../api'

export default function CheckStatus(){
  const [id, setId] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const doCheck = async ()=>{
    setLoading(true); setError(null); setResult(null)
    try{
      const res = await checkStatus(id)
      setResult(res)
    }catch(e){
      setError(e.message || 'Failed')
    }finally{ setLoading(false) }
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Check Transaction Status</h2>
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow space-y-4 max-w-lg">
        <div>
          <label className="block text-sm">Custom Order ID</label>
          <input className="w-full border rounded px-2 py-1" value={id} onChange={(e)=>setId(e.target.value)} />
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded" onClick={doCheck} disabled={!id || loading}>{loading ? 'Checking...' : 'Check'}</button>
          <button className="px-3 py-1 border rounded" onClick={()=>{setId(''); setResult(null); setError(null)}}>Clear</button>
        </div>

        <div>
          {error && <div className="text-red-400">{error}</div>}
          {result && (
            <pre className="bg-gray-100 dark:bg-gray-700 p-2 rounded overflow-auto">{JSON.stringify(result, null, 2)}</pre>
          )}
        </div>
      </div>
    </div>
  )
}