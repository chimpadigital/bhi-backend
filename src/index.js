import app from './app'
import mongoConnect from './database'

app.listen(app.get('port'), async () => {
  await mongoConnect()
  
  console.log('[app] running success on port', app.get('port'))
})