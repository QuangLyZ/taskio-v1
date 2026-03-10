export default function NotFound () {
  return(
  <section className="signing-page-body">
        <div style={{textAlign: 'center',}}>
          <p className='logo-lg'>404</p>
          <p className='slogan'>Not Found</p>
          <div className='flex-column text-center' style={{gap:'0.8rem', marginTop:'2.4rem',}}>
            <p className='body txt-secondary bold'>Looks like your accessing the wrong link :(</p>
            <p className='body txt-secondary bold'>Please, try again.</p>
          </div>
        </div>
  </section>
  )
}