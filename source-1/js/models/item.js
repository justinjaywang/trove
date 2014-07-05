// models/item.js

// define item model
App.Item = DS.Model.extend({
  name         : DS.attr('string'),
  price        : DS.attr('number'),
  description  : DS.attr('string'),
  imageUrl     : DS.attr('string'),
  thumbnailUrl : DS.attr('string'),
  category     : DS.attr('string'),
  tags         : DS.attr('string'),
  creationDate : DS.attr('string'),
  // creationDate : DS.attr('date', {
  //   defaultValue: function() { return new Date(); }
  // })

  urlName: function() {
    return this.get('name').replace(/\s+/g, '-');
  }.property('name')
});

// sample data
App.Item.FIXTURES = [{
  id: 1,
  name: 'Panton Floor Lamp',
  price: 0,
  description: 'Aviators stone roses kosovo war mad props, rollerblades simpsons trl trainers barbie. Ford explorer carpenter pants bandanas seinfeld friends ace ventura. Chillax oasis rachel haircut slap bracelet nerf guns miss cleo.',
  imageUrl: 'https://d2isyty7gbnm74.cloudfront.net/4E5myXpNw-OOT612Cb_-5li0yGY=/646x646/square-production.s3.amazonaws.com/files/4a0ed97bdac41de399eec32897ac92b09995e912/original.jpeg',
  thumbnailUrl: 'https://d2isyty7gbnm74.cloudfront.net/Tw4THa_fLvcHqmKX-TlKA2R8ecw=/276x276/square-production.s3.amazonaws.com/files/4a0ed97bdac41de399eec32897ac92b09995e912/original.jpeg',
  category: 'bathroom',
  tags: 'bathroom;minimal',
  creationDate: 'Mon, 26 Aug 2013 20:23:43 GMT'
}, {
  id: 2,
  name: 'Citrus Juicer',
  price: 1,
  description: 'Hulk hogan maze screensavers savage garden alanis morissette da bomb ain’t no thang german reunification, bop it videocassette baby got back once you pop you can’t stop kazaa. Gak spice girls mighty morphin power rangers maxin’ home alone. Lorem enrique iglesias glow in the dark stickers rodney king riots bill clinton britpop.',
  imageUrl: 'https://d2isyty7gbnm74.cloudfront.net/DliM4ibNe6VEzPdp55XOhv_hwjo=/646x646/square-production.s3.amazonaws.com/files/26a152a00db1ec37c15efbbcd023e65d9298d750/original.jpeg',
  thumbnailUrl: 'https://d2isyty7gbnm74.cloudfront.net/7SaMeVKLxZ2NLiAf2DnUCXbZEIg=/276x276/square-production.s3.amazonaws.com/files/26a152a00db1ec37c15efbbcd023e65d9298d750/original.jpeg',
  category: 'kitchen',
  tags: 'kitchen',
  creationDate: 'Fri, 07 Aug 2013 10:10:10 GMT'
}, {
  id: 3,
  name: 'Soap Dish',
  price: 0,
  description: 'Fresh hey arnold playa garth brooks nelson mandela, christina aguilera boo ya vanilla ice mariah carey clueless.',
  imageUrl: 'https://d2isyty7gbnm74.cloudfront.net/zKq0GifrnikazdjMY6WRaTsLE8I=/646x646/square-production.s3.amazonaws.com/files/c6c9e11b68ff83d66b5c3b3f0b31677ac6dabaee/original.jpeg',
  thumbnailUrl: 'https://d2isyty7gbnm74.cloudfront.net/cw2XwqHm0H-89p5WDO96gTgalWo=/276x276/square-production.s3.amazonaws.com/files/c6c9e11b68ff83d66b5c3b3f0b31677ac6dabaee/original.jpeg',
  category: 'bathroom',
  tags: 'bathroom',
  creationDate: 'Fri, 07 Aug 2013 10:10:10 GMT'
}, {
  id: 4,
  name: 'Thermo Mug',
  price: 0,
  description: 'Madonna lisa frank nerf guns fanny packs aol instant messenger.',
  imageUrl: 'https://d2isyty7gbnm74.cloudfront.net/2ExBBBVA5QNDHktcLWmX_nRtmSI=/646x646/d1g145x70srn7h.cloudfront.net/files/4fdc04bd97aa87ada60b2b265b993d1d723df3aa/original.jpeg',
  thumbnailUrl: 'https://d2isyty7gbnm74.cloudfront.net/V6NEm8yunHwYUjeKXyDv4uXlgbM=/276x276/d1g145x70srn7h.cloudfront.net/files/4fdc04bd97aa87ada60b2b265b993d1d723df3aa/original.jpeg',
  category: 'kitchen',
  tags: 'kitchen',
  creationDate: 'Fri, 07 Aug 2013 10:10:10 GMT'
}, {
  id: 5,
  name: 'Mango Bowl',
  price: 0,
  description: 'Walkman bare midriffs boris yeltsin skip-it acid wash gulf war. Korn the matrix flip flops frasier da bomb des.',
  imageUrl: 'https://d2isyty7gbnm74.cloudfront.net/rpN8DIWfEJbmScr1yWT_dzznoC8=/646x646/d1g145x70srn7h.cloudfront.net/files/af3e4f22b39f7a8c82fb0b5312790032be95f0d0/original.jpeg',
  thumbnailUrl: 'https://d2isyty7gbnm74.cloudfront.net/Y6pBg8qMJO9Zsp_kLrG8BvIuino=/276x276/d1g145x70srn7h.cloudfront.net/files/af3e4f22b39f7a8c82fb0b5312790032be95f0d0/original.jpeg',
  category: 'kitchen',
  tags: 'kitchen;plateware',
  creationDate: 'Fri, 07 Aug 2013 10:10:10 GMT'
}, {
  id: 6,
  name: 'Cookie Cutter Set',
  price: 1,
  description: 'Amet cut-off jean shorts green day generation y miss cleo, leotards pearl jam trainers phat princess diana animated gifs bop it. Armageddon overalls ford explorer home alone home improvement alternative rock highlights, environmentalism apollo 13 kurt cobain ’n sync.
',
  imageUrl: 'https://d2isyty7gbnm74.cloudfront.net/x81EIqCRiUCiu-tYj8dwb7q8GfE=/646x646/d1g145x70srn7h.cloudfront.net/files/689b7d084994d926e976de01b78182d604161717/original.jpeg',
  thumbnailUrl: 'https://d2isyty7gbnm74.cloudfront.net/4ITMKiWTvXiV5XKp5HkZrFt_2hw=/276x276/d1g145x70srn7h.cloudfront.net/files/689b7d084994d926e976de01b78182d604161717/original.jpeg',
  category: 'kitchen',
  tags: 'kitchen',
  creationDate: 'Fri, 07 Aug 2013 10:10:10 GMT'
}
];