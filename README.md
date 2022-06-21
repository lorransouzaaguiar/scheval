# Scheval

Scheval é uma biblioteca de validação de dados por schema inspirado na biblioteca yup, mas com algumas pequenas diferenças. O Scheval utiliza conceitos de notification pattern, onde o retorno dos errors da validação são retornados todos de uma só vez alem de evitar gerar exceptions em validações.

> Ainda em fase alpha, contém poucos métodos. Precisamente somente string() e number() e seu repectivo sub-metodo isRequired(). Ainda não há funcionalidade de mudar as mensagem de erro padrão

## Instalação

```sh
npm install @lorransouzaaguiar/scheval@1.0.0-alpha.1
```

## Uso

```js
import {val, validation} from '@lorransouzaaguiar/scheval'

const createProduct = ({ ...product }) => {

    const {data, isValid, errors} = validate({
        title: val(product.title).string().isRequired(),
        price: val(product.price).number().isRequired(),
        qtyStock: val(product.qtyStock).number().isRequired(),
        description: val(product.description).string(),
        category_id: val(product.category_id).number().isRequired(),
    })

    if(!isValid) 
      return errors 

    return data
}

createProduct('João', '22', '1', 'descrição')
/* errors: {
  price: 'Expected element to be a number', 
  qtyStock: 'Expected element to be a number',
  category_id: 'The element is required',
} */
```

## Tabela de Conteúdos

  - [validate](#validate)
  - [val](#val)
    - [string]()
      - [isRequired]()
    - [number]()
      - [isRequired]()


## Documentação

### Validate
### val
#### string
#### number
