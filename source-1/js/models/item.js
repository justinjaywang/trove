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
  name: 'Zig-Zag Soap Dish',
  price: 0,
  description: 'Aviators stone roses kosovo war mad props, rollerblades simpsons trl trainers barbie. Ford explorer carpenter pants bandanas seinfeld friends ace ventura. Chillax oasis rachel haircut slap bracelet nerf guns miss cleo.',
  imageUrl: 'http://placehold.it/640x640',
  thumbnailUrl: 'http://placehold.it/320x320',
  category: 'bathroom',
  tags: 'bathroom;minimal',
  creationDate: 'Mon, 26 Aug 2013 20:23:43 GMT'
}, {
  id: 2,
  name: 'Citrus Juicer',
  price: 1,
  description: 'Hulk hogan maze screensavers savage garden alanis morissette da bomb ain’t no thang german reunification, bop it videocassette baby got back once you pop you can’t stop kazaa. Gak spice girls mighty morphin power rangers maxin’ home alone. Lorem enrique iglesias glow in the dark stickers rodney king riots bill clinton britpop.',
  imageUrl: 'http://placehold.it/640x640',
  thumbnailUrl: 'http://placehold.it/320x320',
  category: 'kitchen',
  tags: 'kitchen',
  creationDate: 'Fri, 07 Aug 2013 10:10:10 GMT'
}, {
  id: 3,
  name: 'Toothbrush Cap',
  price: 0,
  description: 'Fresh hey arnold playa garth brooks nelson mandela, christina aguilera boo ya vanilla ice mariah carey clueless.',
  imageUrl: 'http://placehold.it/640x640',
  thumbnailUrl: 'http://placehold.it/320x320',
  category: 'bathroom',
  tags: 'bathroom',
  creationDate: 'Fri, 07 Aug 2013 10:10:10 GMT'
}, {
  id: 4,
  name: 'Toothbrush Stand',
  price: 0,
  description: 'Madonna lisa frank nerf guns fanny packs aol instant messenger.',
  imageUrl: 'http://placehold.it/640x640',
  thumbnailUrl: 'http://placehold.it/320x320',
  category: 'bathroom',
  tags: 'bathroom;minimal',
  creationDate: 'Fri, 07 Aug 2013 10:10:10 GMT'
}, {
  id: 5,
  name: 'Makeup Box',
  price: 0,
  description: 'Walkman bare midriffs boris yeltsin skip-it acid wash gulf war. Korn the matrix flip flops frasier da bomb des.',
  imageUrl: 'http://placehold.it/640x640',
  thumbnailUrl: 'http://placehold.it/320x320',
  category: 'bathroom',
  tags: 'bathroom;storage',
  creationDate: 'Fri, 07 Aug 2013 10:10:10 GMT'
}, {
  id: 6,
  name: 'Cookie Cutter Set',
  price: 1,
  description: 'Amet cut-off jean shorts green day generation y miss cleo, leotards pearl jam trainers phat princess diana animated gifs bop it. Armageddon overalls ford explorer home alone home improvement alternative rock highlights, environmentalism apollo 13 kurt cobain ’n sync.
',
  imageUrl: 'http://placehold.it/640x640',
  thumbnailUrl: 'http://placehold.it/320x320',
  category: 'kitchen',
  tags: 'kitchen',
  creationDate: 'Fri, 07 Aug 2013 10:10:10 GMT'
}
];