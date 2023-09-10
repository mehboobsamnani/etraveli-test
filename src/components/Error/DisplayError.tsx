
const Error = ({ err }: { err: Error[] }) => {
  return (
    <>  
    {err.map((error : Error , index : number) => 
      <p key={index} style={{flex: "0 1 100%"}}>{error && error.message}</p>
    )}
    </>
  )
}

export default Error
