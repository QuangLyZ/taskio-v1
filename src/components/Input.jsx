export default function Input ({type, name, id, value, onChange, width, placeholder}) {
  return(
    <input 
      type={type}
      name={name}
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className='bg-white txt-secondary body-sm regular text-left'
      style={{
        height: '4rem',
        minWidth: '20rem',
        width: width,
        padding: '0.8rem 1.6rem',
        borderRadius: '0.8rem',
        filter: 'drop-shadow(1px 1px 4px rgba(119, 119, 119, 0.25))',
        border:'none',
      }}
    />
  )
}