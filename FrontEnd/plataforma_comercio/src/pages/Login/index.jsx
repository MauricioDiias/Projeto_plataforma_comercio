import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import './styles.css'

function Login() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height:'100vh'
      }}
      className="container"
    >
      <Card
        title={"Login"}
        style={{ width: "500px", margin: "200px 0 300px 0" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="p-field">
            <span className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText placeholder="Email" />
            </span>
          </div>
          <div className="p-field">
            <span className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText type="password" placeholder="Senha" />
            </span>
          </div>
          <Button label="Log In" type="submit" />
        </div>
      </Card>
    </div>
  );
}
export default Login;
