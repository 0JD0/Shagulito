//  comprueba si una cadena de caracter es JSON
//  valor de la cadena de caracter a verificar   
//  true si es correcto y false si no

function isJSONString(value)
{
    try {
        if (value != "[]") {
            JSON.parse(value);
            return true;
        } else {
            return false;
        }
    } catch(error) {
        return false;
    }
}
