// FI translations
export const translations = {
"modal.title": "Kerro meille näistä aiheista",
"modal.subtitle":
  "Ymmärrämme mitä tahansa kieltä, täytämme kaiken ja käännämme tarvittaessa",

"loader.initial": "Valmistellaan lomaketta...",

// Dynamic progress stages for initAnalyze loading
"loader.stage1": "Analysoidaan lomakekenttiä...",
"loader.stage2": "Tunnistetaan kieltä...",
"loader.stage3": "Tunnistetaan arkaluontoisia kenttiä...",
"loader.stage4": "Valmistellaan ehdotuksia...",
"loader.stage5": "Melkein valmis!",

"button.startSpeaking": "Aloita puhuminen",
"button.stopSpeaking": "Lopeta tallennus",
"button.tryAgain": "Yritä uudelleen",

"listening.title": "Kuunnellaan...",
"listening.subtitle": "Puhu luonnollisesti siitä, mitä haluat täyttää",
"processing.title": "Käsittelemme...",

// Dynamic progress stages for processing (voice->text->LLM)
"processing.stage1": "Muunnetaan puhetta tekstiksi...",
"processing.stage2": "Tunnistetaan kieltä...",
"processing.stage3": "Ymmärretään pyyntöäsi...",
"processing.stage4": "Poimitaan tietoja...",
"processing.stage5": "Vastaavuus lomakekenttiin...",
"processing.stage6": "Tarkistetaan tietoja...",
"processing.stage7": "Valmistellaan tuloksia...",
"processing.stage8": "Melkein valmis!",

"success.title": "Lomake täytetty!",
"success.subtitle": "Tarkista täytetyt kentät ja lähetä, kun olet valmis",
"success.apply_changes": "Täytä ja tarkista",
"success.empty_fields": "Ei täytetty",
"success.check_fields": "Tarkista",
"success.filled_fields": "Valmis",
"success.field_single": "kenttä",
"success.fields_multiple": "kenttää",
"success.require_attention": "vaativat huomiota",
"success.successfully_filled": "täytetty onnistuneesti",

"empty.title": "Täytettäviä kenttiä ei löytynyt",
"empty.subtitle": "Tässä lomakkeessa ei ole kenttiä, jotka voidaan täyttää puheella",

"error.title": "Virhe",
"error.microphone": "Mikrofonin käyttöoikeus vaaditaan",
"error.noFields": "Tämän sivun lomakkeita ei löytynyt",
"error.noActiveForm": "Aktiivista lomaketta ei löytynyt täytettäväksi",
"error.lowConfidence":
  "Ääntä ei voitu ymmärtää selkeästi. Puhu selkeämmin.",
"error.general": "Jotain meni pieleen. Yritä uudelleen.",
"error.domainNotAllowed":
  "Tämä verkkotunnus ei ole valtuutettu käyttämään palvelua. Ota yhteyttä verkkosivuston ylläpitäjään.",
"error.invalidApiKey": "Palvelu ei ole oikein määritetty. Ota yhteyttä sivuston ylläpitäjään.",
"error.rateLimited": "Palvelu on juuri nyt ruuhkautunut. Yritä uudelleen hetken kuluttua.",
"error.quotaExhausted": "Tämän palvelun käyttöraja on saavutettu. Ota yhteyttä sivuston ylläpitäjään.",
"error.no_fields_detected":
  "Lomakkeen täyttämiseen tarvittavia tietoja ei tunnistettu. Yritä määrittää selkeämmin, mitä tietoja kenttiin tulee syöttää.",
"error.no_data_title": "Tietoja ei tunnistettu",
"error.mic_title": "Mikrofoni vaaditaan",
"error.network_title": "Yhteysongelma",
"error.showDetails": "Näytä tekniset tiedot",

"floatingButton.fillByVoice": "Täytä äänellä",

"form.progress.filled": "{count} täytetty",
"form.progress.scrollToSelect": "Vieritä valitaksesi",
"form.formNumber": "{current} / {total}",
"form.allForms": "Kaikki {count} lomaketta",
"form.label": "Lomake",
"form.fields": "Kentät",
"button.close": "Sulje",
// Consent modal
"consent.title": "Tietosi Yksityisyys",
"consent.subtitle": "Lue tietojesi suojaa koskevat tiedot huolellisesti",
"consent.warning_title": "Tärkeää: Älä Jaa Arkaluonteisia Tietoja",
"consent.warning":
  "Älä mainitse salasanoja, maksudetaileja, viranomaistunnuksia tai lääketieteellisiä tietoja. Näitä tietoja ei ole tarkoitettu äänitoiminnon käsiteltäväksi.",
"consent.summary_card1_title": "Mitä Keräämme",
"consent.summary_data1": "Äänitallennus → muunnettu tekstiksi",
"consent.summary_data2":
  "Kenttien nimet/tyypit/paikkamerkit (ilman arvoja; arkaluonteiset kentät poistettu)",
"consent.summary_data3": "Tekniset lokit (IP, selaintiedot)",
"consent.summary_card2_title": "Minne Se Menee",
"consent.summary_transfer":
  "OpenAI (USA) AI-käsittelyyn • Google Cloud/Firebase (EU, Puola) hostingiin ja turvallisuuteen",
"consent.summary_card3_title": "Oikeutesi",
"consent.summary_rights":
  "Peruuta suostumus milloin tahansa • Pyydä pääsyä tai tietojesi poistoa • Täydelliset tiedot <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Tietosuojakäytännössä</a>",
"consent.full_details_title": "Lue Täydelliset Tiedot",
"consent.section1_title": "Mitä tietoja käsittelemme?",
"consent.data1":
  "Äänitallennus. Äänitiedosto lähetetään OpenAI Whisperille palvelimemme kautta transkriptiota varten. Tiedostoa ei tallenneta palvelimelle käsittelyn jälkeen.",
"consent.data2":
  "Äänitranskriptio (teksti). Lähetetään OpenAI GPT:lle lomakkeen täyttöä varten. Oletuksena emme tallenna transkriptiota järjestelmiimme; teknisissä lokeissa tallennamme vain metatiedot (tekstin pituus, kieli, kesto). Tärkeää: OpenAI saattaa tallentaa pyyntötiedot 30 päivään asti väärinkäytön estämiseksi; varhainen poisto OpenAI:ssa ei ole saatavilla; tietoja ei käytetä mallien kouluttamiseen.",
"consent.data3":
  "Lomakekentän metatiedot. Nimet/tyypit/paikkamerkit (arkaluonteiset kentät poistettu).",
"consent.data4":
  "Sivun URL. Infrastruktuurimme käsittelee (yhteensopivuuteen/diagnostiikkaan), EI lähetetä OpenAI:lle. Vältä henkilötietoja URL-kyselyparametreissa.",
"consent.data5":
  "Selaimen User-Agent. Käytetään paikallisesti ja infrastruktuurissamme (yhteensopivuus/turvallisuus), EI lähetetä OpenAI:lle.",
"consent.data6":
  "IP-osoite. Google Cloud/Firebase-infrastruktuuri kirjaa turvallisuuden vuoksi (enintään 30 päivää), EI lähetetä OpenAI:lle.",
"consent.section2_title":
  "Minne ja millä oikeusperusteella tiedot siirretään?",
"consent.recipients":
  "Vastaanottajat. OpenAI (USA) — ääni-/tekstinkäsittely; Google Cloud/Firebase (EU/Puola) — hosting ja turvallisuuslokit. Tietoja ei käytetä mallien kouluttamiseen.",
"consent.transfer1":
  "OpenAI (USA). OpenAI:lle tehdyt pyynnöt (mukaan lukien ääni/teksti) saattavat tallentua OpenAI:lle 30 päivään asti väärinkäytön estämiseksi; tietoja ei käytetä mallien kouluttamiseen. Siirto Yhdysvaltoihin — perustuu Euroopan komission hyväksymiin SCC:hin.",
"consent.basis_title": "Oikeusperusteet:",
"consent.basis1": "Äänitoiminto — suostumuksesi (Art. 6(1)(a) GDPR).",
"consent.basis2":
  "Tekniset lokit (IP/UA/URL) — oikeutetut edut (Art. 6(1)(f)) — turvallisuus ja virheenkorjaus.",
"consent.section3_title": "Oikeutesi",
"consent.rights1":
  "Voit peruuttaa suostumuksen widget-asetuksissa milloin tahansa; tämä ei vaikuta käsittelyn laillisuuteen ennen peruutusta.",
"consent.rights2":
  "Suostumuksen peruuttamisen lisäksi sinulla on oikeus pyytää pääsyä tai järjestelmiin tallennettujen tietojesi poistoa (tekniset lokit, kustannusmittarit) verkkosivuston omistajan kautta. Täydelliset tiedot <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Tietosuojakäytännössä</a>.",
"consent.rights3":
  "Tämä toiminto on tarkoitettu 16+ -käyttäjille; nuoremmille käyttäjille vaaditaan vanhemman/huoltajan suostumus.",
"consent.footer_legal_title": "Oikeudelliset Tiedot",
"consent.footer_controller":
  "Rekisterinpitäjä: tämän verkkosivuston omistaja.",
"consent.footer_processor": "TypelessForm: toimii käsittelijänä.",
"consent.footer_contact": "Tietosuojayhteys: info@webappski.com.",
"consent.footer_sccs":
  "Siirto Yhdysvaltoihin suoritetaan SCC:n mukaisesti. Yksityiskohdat ovat saatavilla <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Tietosuojakäytännössämme</a>.",
"consent.accept": "Hyväksyn",

// Consent checkboxes
"consent.checkbox_main": "Suostun ääni- ja lomakemetadatani käsittelyyn TypelessFormin toimesta ja kansainväliseen siirtoon Yhdysvaltoihin (OpenAI) SCC:iden mukaisesti, kuten <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>tietosuojakäytännössä</a> kuvataan.",
"consent.checkbox_age": "Vahvistan olevani 16+ vuotias tai minulla on vanhemman/huoltajan suostumus.",

// Privacy settings / data deletion
"privacy.title": "Tietosuoja ja tiedot",
"privacy.subtitle": "Hallitse suostumustasi ja tietojasi",
"privacy.info_title": "Suostumustietosi",
"privacy.user_id": "Tunniste",
"privacy.consent_date": "Suostumus annettu",
"privacy.policy_version": "Käytännön versio",
"privacy.usage_count": "Käyttökerrat",
"privacy.no_data": "Suostumustietoja ei löytynyt tältä laitteelta.",
"privacy.delete_title": "Poista tietoni",
"privacy.delete_description": "Tämä poistaa pysyvästi kaikki suostumustietosi palvelimiltamme ja tyhjentää paikalliset tiedot. Tätä toimintoa ei voi kumota.",
"privacy.delete_confirm": "Ymmärrän, että tämä on pysyvää",
"privacy.delete_button": "Poista tietoni",
"privacy.deleting": "Poistetaan...",
"privacy.delete_success": "Kaikki tietosi on poistettu onnistuneesti.",
"privacy.delete_error": "Tietojen poistaminen epäonnistui. Yritä uudelleen tai ota yhteyttä info@webappski.com.",
"privacy.done": "Valmis",
"privacy.link": "Tietosuoja"
};
