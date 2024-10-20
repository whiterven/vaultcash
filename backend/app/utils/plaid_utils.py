import plaid
from plaid.api import plaid_api
from plaid.model.link_token_create_request import LinkTokenCreateRequest
from plaid.model.link_token_create_request_user import LinkTokenCreateRequestUser
from plaid.model.products import Products
from plaid.model.country_code import CountryCode
from flask import current_app

def get_plaid_client():
    configuration = plaid.Configuration(
        host=plaid.Environment.Sandbox,
        api_key={
            'clientId': current_app.config['PLAID_CLIENT_ID'],
            'secret': current_app.config['PLAID_SECRET'],
        }
    )
    api_client = plaid.ApiClient(configuration)
    return plaid_api.PlaidApi(api_client)

def create_link_token(user_id):
    client = get_plaid_client()

    request = LinkTokenCreateRequest(
        products=[Products('auth')],
        client_name="Your App Name",
        country_codes=[CountryCode('US')],
        language='en',
        user=LinkTokenCreateRequestUser(
            client_user_id=str(user_id)
        )
    )
    response = client.link_token_create(request)
    return response.link_token

def exchange_public_token(public_token):
    client = get_plaid_client()
    exchange_response = client.item_public_token_exchange(public_token)
    access_token = exchange_response['access_token']
    item_id = exchange_response['item_id']
    return access_token, item_id

def get_account_info(access_token):
    client = get_plaid_client()
    accounts = client.accounts_get(access_token)
    return accounts