#Wipe guest information
guest = User.find_by(username: "guest")

unless guest.nil?
  guest.all_notes.each{ |note| note.destroy! }
  guest.notebooks.each{ |notebook| notebook.destroy! }
  guest.reset_token!
  guest.destroy!
end

#Create guest user and default notebooks
guest = User.new(username: 'guest', password: 'guestpass')

inbox = guest.notebooks.new(name: "Inbox", removable: false); inbox.save!
recycling = guest.notebooks.new(name: "Recycling", removable: false); recycling.save!
projects = guest.notebooks.new(name: "Projects"); projects.save!
petfinder = guest.notebooks.new(name: "Petfinder"); petfinder.save!
delete_me = guest.notebooks.new(name: "Delete this notebook!"); delete_me.save!

guest.open_notebook_id = projects.id
guest.save!

guest.avatar = "https://s3.amazonaws.com/togethernote-dev/guest_images/bulldog_avatar.jpg"
guest.save!

# Populate each notebook with notes
## Projects
### Kombucha
kombucha = projects.notes.create!(
  title: "Kombucha - Making a SCOBY",
  body: "<div>Pick up:<img src=\"https://s3.amazonaws.com/togethernote-dev/guest_images/kombucha.jpg\"></div><ul><li>sugar</li><li>black tea (loose leaf)</li><li>64 oz jar</li><li>any bottle of unfiltered kombucha</li></ul><div><br></div><div>Do:</div><ul><li>Boil enough water to fill the jar</li><li>Add 1 tablespoon black tea and 1/2 cup sugar</li><li>Let cool to room temp</li><li>Add 1 cup starter kombucha</li><li>Cover with coffee filter and use rubber band to secure it</li><li>Place in a dark location</li><li>Wait 2-4 weeks</li></ul>"
)

tag1 = Tag.find_by(name: "cooking") || Tag.create!(name: "cooking")
kombucha.tag_ids += [tag1.id]

### Cat Tree
cat_tree = projects.notes.create!(
  title: "Cat Tree",
  body: "<div>Go here: <a href=\"http://iheartcats.com/10-cool-diy-cat-trees/\">http://iheartcats.com/10-cool-diy-cat-trees/</a></div><div><br></div><div><b>Supplies</b>:</div><ol><li>Rope</li><li>Carpeting</li><li>Plywood</li><li>Cats</li></ol><div><br></div><div><br></div><div><b>Booking cat</b>:<img src=\"https://s3.amazonaws.com/togethernote-dev/guest_images/book_cat.jpg\"> just get an IKEA shelf and those clip-on attachments. Super easy! Of course, then I have a bookshelf without any books.</div><div><br></div><div><br></div><div><br></div><div><br></div><div><br></div><div><br></div><div><br></div><div><b>Minimalist cat</b>:<img src=\"https://s3.amazonaws.com/togethernote-dev/guest_images/shelf_cat.jpg\"> awesome, but probably a pain to install. Plus, do I trust my heavy cats jumping on shelves I installed?Almost certainly not.</div><div><br></div><div><br></div><div><br></div><div><br></div><div><br></div><div><br></div><div><br></div><div><b>IKEA cat:</b><img src=\"https://s3.amazonaws.com/togethernote-dev/guest_images/ikea_cat.jpg\"> not crazy into it but maybe I should just peruse IKEA and draw inspiration.</div><div><br></div>"
)

tag1 = Tag.find_by(name: "home improvement") || Tag.create!(name: "home improvement")
tag2 = Tag.find_by(name: "cats") || Tag.create!(name: "cats")
cat_tree.tag_ids += [tag1.id, tag2.id]


### Sharpen Knives
knives = projects.notes.create!(
  title: "Sharpen Kitchen Knives",
  body: "<ul><li><s>Option A: go </s><a href=\"https://www.yelp.com/biz/korin-new-york\"><s>here</s></a><s> and pay $15/knife, probably $75-100 total</s></li><li><s>Option B: pick up a sharpening stone from </s><a href=\"https://www.amazon.com/Winco-12-Inch-Grain-Sharpening-Medium/dp/B0016J5OFU/ref=sr_1_6?ie=UTF8&amp;qid=1470931014&amp;sr=8-6&amp;keywords=sharpening+stone\"><s>amazon</s></a><s> for $10 and do it myself</s></li><li>Option C: befriend a professional chef</li></ul><div><br></div>"
)

tag1 = Tag.find_by(name: "cooking") || Tag.create!(name: "cooking")
tag2 = Tag.find_by(name: "to-do") || Tag.create!(name: "to-do")
knives.tag_ids += [tag1.id, tag2.id]

### Smart Lighting
lighting = projects.notes.create!(
  title: "Smart Lighting",
  body: "<div><img src=\"https://s3.amazonaws.com/togethernote-dev/guest_images/smartbulb.jpg\"><b><span style=\"font-size: 24px;\">Bulbs</span></b></div><ol><li><a href=\"https://www.amazon.com/GE-Wireless-Connected-60-Watt-Equivalent/dp/B00NOL16K0/ref=sr_1_4?ie=UTF8&amp;qid=1470928813&amp;sr=8-4&amp;keywords=smart+bulb\">GE</a></li></ol><ol><li><a href=\"https://www.amazon.com/LUCERO-Smart-Bulb-Bluethooth-Multicolor/dp/B01A85LTQU/ref=sr_1_5?ie=UTF8&amp;qid=1470928856&amp;sr=8-5&amp;keywords=smart+bulb\">Lucero</a></li><li><a href=\"https://www.amazon.com/Flux-Bluetooth-Smart-Light-Generation/dp/B016NVSI7G/ref=sr_1_6?ie=UTF8&amp;qid=1470928856&amp;sr=8-6&amp;keywords=smart+bulb\">Flux</a></li><li><a href=\"https://www.amazon.com/Philips-455295-White-Equivalent-Single/dp/B01C5C9ZLK/ref=sr_1_8?ie=UTF8&amp;qid=1470928856&amp;sr=8-8&amp;keywords=smart+bulb\">Philips</a></li></ol><div><br></div><div><span style=\"font-size: 24px;\"><b>In Stock At:</b></span></div><ol><li><a href=\"https://www.google.com/maps/place/The+Home+Depot/@40.667606,-74.0012007,17z/data=!3m1!4b1!4m5!3m4!1s0x89c25aefe7c670e7:0xe01d1fc2a3324414!8m2!3d40.667602!4d-73.999012\">Home Depot</a></li><li><a href=\"https://www.google.com/maps/search/best+buy/@40.7325558,-73.9982544,13.96z\">Best Buy</a></li></ol><div><br></div><div>Living Room: 4 bulbs</div><div>Bedroom: 2 bulbs</div><div>Bathroom: 0 (right?)</div><div>Kitchen: 2 bulb</div>"
)

tag1 = Tag.find_by(name: "home improvement") || Tag.create!(name: "home improvement")
tag2 = Tag.find_by(name: "tech") || Tag.create!(name: "tech")
lighting.tag_ids += [tag1.id, tag2.id]

### Drag To Petfinder
drag_to_petfinder = projects.notes.create!(
  title: "Bori (drag me)",
  body: "<div>Into the Petfinder notebook... <img src=\"https://s3.amazonaws.com/togethernote-dev/guest_images/bori.jpeg\"></div><div><br></div><div><a href=\"https://www.petfinder.com/petdetail/35794981\">https://www.petfinder.com/petdetail/35794981</a></div><div><br></div>"
)

tag1 = Tag.find_by(name: "dogs") || Tag.create!(name: "dogs")
drag_to_petfinder.tag_ids += [tag1.id]


## Petfinder
### Rosie
rosie = petfinder.notes.create!(
  title: "Rosie",
  body: "<div><a href=\"https://www.petfinder.com/petdetail/35835015\">https://www.petfinder.com/petdetail/35835015</a><img src=\"https://s3.amazonaws.com/togethernote-dev/guest_images/rosie.jpeg\"></div><div><br></div><div>The piano prodigy?</div>"
)

tag1 = Tag.find_by(name: "dogs") || Tag.create!(name: "dogs")
rosie.tag_ids += [tag1.id]

### Kirby
kirby = petfinder.notes.create!(
  title: "Kirby",
  body: "<div><a href=\"https://www.petfinder.com/petdetail/34634040\">https://www.petfinder.com/petdetail/34634040</a><img src=\"https://s3.amazonaws.com/togethernote-dev/guest_images/kirby.jpeg\"></div>"
)

tag1 = Tag.find_by(name: "cats") || Tag.create!(name: "cats")
kirby.tag_ids += [tag1.id]

### Aramis
aramis = petfinder.notes.create!(
  title: "Aramis",
  body: "<div><a href=\"https://www.petfinder.com/petdetail/35830063\">https://www.petfinder.com/petdetail/35830063</a><img src=\"https://s3.amazonaws.com/togethernote-dev/guest_images/aramis.jpeg\"></div><div><br></div>"
)

tag1 = Tag.find_by(name: "dogs") || Tag.create!(name: "dogs")
aramis.tag_ids += [tag1.id]

### Annick
annick = petfinder.notes.create!(
  title: "Annick",
  body: "<div><a href=\"https://www.petfinder.com/petdetail/35790524\">https://www.petfinder.com/petdetail/35790524</a><img src=\"https://s3.amazonaws.com/togethernote-dev/guest_images/annick.jpeg\"></div><div><br></div>"
)

tag1 = Tag.find_by(name: "dogs") || Tag.create!(name: "dogs")
annick.tag_ids += [tag1.id]

### Quasi
quasi = petfinder.notes.create!(
  title: "Quasi",
  body: "<div><img src=\"https://s3.amazonaws.com/togethernote-dev/guest_images/quasi.jpeg\"><a href=\"https://www.petfinder.com/petdetail/34866075\">https://www.petfinder.com/petdetail/34866075</a></div>"
)

tag1 = Tag.find_by(name: "cats") || Tag.create!(name: "cats")
quasi.tag_ids += [tag1.id]

### Delete Me
petfinder.notes.create!(
  title: "Delete Me!",
  body: "<div>Hover over me and click the trash icon. Rigggght here ^</div>"
)


## Inbox
### Tapas
inbox.notes.create!(
  title: "Tapas!",
  body: "<div>Who's in: <a href=\"http://www.mitimitinyc.com/\">http://www.mitimitinyc.com/</a></div><div><br></div>"
)

### Cooper
cooper = inbox.notes.create!(
  title: "Cooper",
  body: "<div><a href=\"https://www.petfinder.com/petdetail/35221406\">https://www.petfinder.com/petdetail/35221406</a><img src=\"https://s3.amazonaws.com/togethernote-dev/guest_images/cooper.jpeg\"></div><div><br></div><div>Add this guy too</div>"
)

tag1 = Tag.find_by(name: "dogs") || Tag.create!(name: "dogs")
cooper.tag_ids += [tag1.id]

### Share Me
inbox.notes.create!(
  title: "Share Me!",
  body: "<ol><li>In a new, private-browsing tab, create a new account. Remember the username.</li><li>Type the new user's username into the <span style=\"background-color: rgb(204, 224, 245);\">share it</span> field and hit <b>enter</b>.</li><li>Watch the new note appear in the tab with the new user.</li><li>Click on the notification to view the note, or else open up the <span style=\"background-color: rgb(204, 224, 245);\">Inbox</span> notebook. It's where notes shared with you go by default.</li></ol>"
)


## Recycling
### Groceries
groceries = recycling.notes.create!(
  title: "Groceries",
  body: "<ul><li><s>Cheese (cheddar jack)</s></li><li>Canola oil</li></ul><ul><li><s>Eggs (get Vital Farms)</s></li><li><s>Arborio Rice</s></li><li><s>Shrimp</s></li></ul><ul><li><s>Peppers</s></li><li><s>Asparagus</s></li><li><s>Cumin</s></li><li><s>Garlic powder</s></li><li><s>Dishwashing soap</s></li><li><s>Kitchen trash bags</s></li></ul>"
)

tag1 = Tag.find_by(name: "to-do") || Tag.create!(name: "to-do")
groceries.tag_ids += [tag1.id]

## Delete this notebook!
### Nothing Useful
delete_me.notes.create!(
  title: "Nothing useful in here anyway",
  body: "<div>4 / 0 = orange</div>"
)

### Besides
delete_me.notes.create!(
  title: "Besides",
  body: "<div><span style=\"font-family: &quot;Josefin Slab&quot;, sans-serif;\"> All is not lost: w</span>e'll end up in the recycling.</div>"
)
