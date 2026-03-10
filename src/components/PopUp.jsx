export default function PopUp ({title, message, orangebtnlabel, whitebtnlabel}) {
  return( 
    <div
      className='pop-up-card bg-card flex-column align-center justify-content-center' 
      style={{
        padding: '2.4rem',
        borderRadius: '2.4rem',
      }}
    >
      <p className="pop-up-title txt-primary body bold text-center" style={{marginBottom:'1.6rem',}}>{title}</p>
      <p className="pop-up-txt txt-secondary body-sm regular text-center">{message}</p>
      <div 
        className='flex-column'
        style={{
          gap: '1.6rem',
          marginTop: '2.4rem',
        }}  
      >
        <LargeOrangeButton 
          label={orangebtnlabel}
        />
        <LargeWhiteButton
          label={whitebtnlabel}
        />
      </div>
    </div>
  )
}