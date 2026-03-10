export default function LargeOrangeButton ({
  label, 
  onClick,
  type="button",
}) {
  return(
    <button
      className='bg-orange body bold text-center txt-white'
      type={type}
      style={{
        width: '36.8rem',
        height: '4.5rem',
        padding: '0.8rem 1.6rem',
        borderRadius: '0.8rem',
        filter: 'drop-shadow(1px 1px 4px rgba(119, 119, 119, 0.25))',
      }}
      onClick={onClick}
    >
      {label}
    </button>
  )
}
