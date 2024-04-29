export const YOUR_BOOK_CREATE_MUTATION = `#graphql
  mutation CreateMetaobject ($metaobject: MetaobjectCreateInput!) {
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
