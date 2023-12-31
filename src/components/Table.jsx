export default function Table({children}){
      return(
        <div className="table">
            <table className="table__content">{children}</table>
        </div>
      )
}