import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import './styles.css'
import {Link} from 'react-router-dom'

function Login() {
  return (
    <div
      style={{
      
      }}
      className="container"
    >
      <Card
        title={"Login"}
        style={{ width: "500px" }}
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
          <Link to={'/home'} relative="path">
          <Button label="Log In" type="submit" />
          </Link>
        </div>
      </Card>
    </div>
  );
}
export default Login;
