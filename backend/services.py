import json
import requests
from typing import Dict
import logging

from rest_framework.views import APIView


class ConsultasAPI(object):
    """
  MARKET DATA
  Un Market Data es una aplicación que mantiene en memoria el estado del
  mercado en tiempo real. Estos reciben información sobre estados de
  negociación, puntas, profundidad, resumen del mercado, entre otros, para
  posteriormente distribuirla al mercado. Todo este tipo de informacion se
  envía mediante protocolo FIX.

  CLIENTE MARKET DATA
  El Cliente Market Data Renta Variable es un producto creado por la
  Bolsa de Comercio de Santiago con el fin de transcribir los mensajes FIX
  enviados por el Market Data de Renta Variable a una base de datos.

  FUENTE
  https://startup.bolsadesantiago.com/#/descripcion_consulta
  """

    def __init__(self, token, timeout: int = 300):
        self.token = token
        self.timeout = timeout
        self.CONSULTA_HOST = 'https://startup.bolsadesantiago.com/api/consulta'

        self.headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }

        self.params = {
            'access_token': self.token
        }

        self.endpoint_pivot = None

        self.query_params_names = [
            "Nemo",
            "Fecha_Desde",
            "Fecha_Hasta"
        ]
        self.name_error = False

    # ------------------------------
    # Metodos para eliminar la redundancia en el cliente
    # ------------------------------

    def __handle_response(self, query_params: Dict[str, str] = {}):
        """
    Este método manipula de manera centralizada las solicitudes a la API.

    Parameters
    ----------
    query_params : Dict[str, str], opcional
        DESCRIPTION. el default es {}.

    Returns
    -------
    list or dict
        Lista o Dictionario con los datos de la consulta o un mensaje de
        error.

    """

        resp = requests.post(self.endpoint_pivot, params=self.params, headers=self.headers, json=query_params,
                             timeout=self.timeout)

        if resp.status_code == 200:
            if 'listaResult' in resp.json().keys():
                print(type(resp),"xd")
                return resp.json()['listaResult']
            else:
                return resp.json()
        else:
            resp.raise_for_status()

    def __endpoint_builder(self, endpoint: str):
        """
    Constructor centralizado de default host + endpoints

    Parameters
    ----------
    endpoint : str
        endpoint solicitado.

    Returns
    -------
    None.

    """
        self.endpoint_pivot = f"{self.CONSULTA_HOST}/{endpoint}"

    def __param_checker(self, items_):
        """
    Validador de parametros para endpoints con modelos definidos.

    Parameters
    ----------
    items_ :
        parametros del metodo a validar.

    Returns
    -------
    None.

    """
        for key, value in items_:
            if key not in self.query_params_names:
                logging.error(f"El parametro {key} no es valido")
                self.name_error = True

    # ------------------------------
    # Cliente Market Data
    # ------------------------------

    def get_indices_rv(self):
        """
    Valor de los principales índices de renta variable junto con su
    variación porcentual y volumen.

    Returns
    -------
    list
        Lista donde cada elemento es un diccionario.

    """
        self.__endpoint_builder("ClienteMD/getIndicesRV")
        return self.__handle_response()

    def get_instrumentos_rv(self):
        """
    Detalle de los instrumentos disponibles para transar en el
    mercado de renta variable. Se muestra precio de apertura, mínimos y
    máximos y volumen transado, entre otros.

    Returns
    -------
    list
        Lista donde cada elemento es un diccionario.

    """
        self.__endpoint_builder("ClienteMD/getInstrumentosRV")
        return self.__handle_response()

    def get_puntas_rv(self):
        """
    Mejores ofertas que se encuentran ingresadas en el mercado de renta
    variable. Se muestra precio de compra, precio de venta, cantidad, monto,
    condición de liquidación, entre otros.

    Returns
    -------
    list
        Lista donde cada elemento es un diccionario.

    """
        self.__endpoint_builder("ClienteMD/getPuntasRV")
        return self.__handle_response()

    def get_transacciones_rv(self):
        """
    Detalle de las transacciones en renta variable. Se muestra instrumento,
    condición de liquidación y cantidad, entre otros.

    Returns
    -------
    list
        Lista donde cada elemento es un diccionario.

    """

        self.__endpoint_builder("ClienteMD/getTransaccionesRV")
        return self.__handle_response()

"""
class ExternalApi(APIView):
    # cargar la api key desde las variables de entorno del sistma
    api_key = '4A9C8F3D75CB4D48AE30E620A7FFF5BE'  # os.environ['API_BS']

    # Creación de la instancia que manipulara las solicitudes a la API
    con_bs = ConsultasAPI(token=api_key)
    resp = con_bs.get_transacciones_rv()
    for sub in resp:
        for key,value in sub.items():
            if(key == 'amount'):
                print(value)
"""