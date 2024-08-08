import type { Schema, Attribute } from '@strapi/strapi';

export interface ProductVariations extends Schema.Component {
  collectionName: 'components_product_variations';
  info: {
    displayName: 'variations';
    description: '';
  };
  attributes: {
    variation: Attribute.Relation<
      'product.variations',
      'oneToOne',
      'api::variation.variation'
    >;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'product.variations': ProductVariations;
    }
  }
}
