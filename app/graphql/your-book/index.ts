export const YOUR_BOOK_CREATE_MUTATION = `#graphql
  mutation metaobjectCreate ($metaobject: MetaobjectInput!) {
    metaobjectCreate(metaobject: $metaobject) {
    metaobject {
      # Metaobject fields
      id
      handle
      fields {
        key
        value
      }
      displayName
    }
    userErrors {
      message
      code
      field
    }
  }
}
` as const;
