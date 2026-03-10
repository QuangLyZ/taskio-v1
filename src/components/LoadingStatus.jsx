export default function LoadingStatus () {
  return (
      <div style={{textAlign: 'center',}}>
      <p className='slogan'>Loading . . .</p>
      <div className='flex-column text-center' style={{gap:'0.8rem', marginTop:'2.4rem',}}>
        <p className='body txt-secondary bold'>This might take a few moments ^^’</p>
      </div>
    </div>
  )
}