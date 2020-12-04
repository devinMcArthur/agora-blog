import page_sars_cov_2_sentences from "./page_sars_cov_2";
import page_covid_2019_sentences from "./page_covid_2019";
import page_covid_19_transmission_sentences from "./page_covid_19_transmission";
import page_covid_19_symptoms_sentences from "./page_covid_19_symptoms";
import page_covid_19_pandemic_sentences from "./page_covid_19_pandemic";
import covid_19_masks_sentences from "./covid_19_masks";

const sentences = [
  ...page_sars_cov_2_sentences,
  ...page_covid_2019_sentences,
  ...page_covid_19_transmission_sentences,
  ...page_covid_19_symptoms_sentences,
  ...page_covid_19_pandemic_sentences,
  ...covid_19_masks_sentences,
];

export default sentences;
