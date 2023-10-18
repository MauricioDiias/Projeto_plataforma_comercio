function TopBar() {
  
  return (
    <div
      style={{
        marginLeft: "250px",
        height: "91px",
        border: "1px solid #dee2e6",
        padding: "25px",
        display: "flex",
        alignItems: "center",
        fontFamily: "Helvetica",
        gap:'50px'
      }}
    >
      <i className="pi pi-bars"></i>
      <h3 style={{color:'#495057'}}>Home / Cadastrar Produto</h3>
    </div>
  );
}
export default TopBar;
