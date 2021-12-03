import _ids from "../_ids";

import { Page, PageDocument } from "@models";

export interface SeededPages {
  page_sars_cov_2: PageDocument;
  page_covid_2019: PageDocument;
  page_covid_19_transmission: PageDocument;
  page_covid_19_symptoms: PageDocument;
  page_covid_19_pandemic: PageDocument;
  page_covid_19_masks: PageDocument;
  page_covid_19_deaths: PageDocument;
  page_covid_19_testing: PageDocument;
  page_covid_19_rt_pcr_test: PageDocument;
  page_rt_pcr_cycle_threshold: PageDocument;
}

const createPages = () => {
  return new Promise<SeededPages>(async (resolve, reject) => {
    try {
      const page_sars_cov_2 = new Page({
        _id: _ids.pages.page_sars_cov_2._id,
        title: "Severe Acute Respiratory Syndrome Coronavirus 2 (SARS-CoV-2)",
        slug: "Severe_Acute_Respiratory_Syndrome_Coronavirus_2_(SARS-CoV-2)",
        paragraphs: [_ids.pages.page_sars_cov_2.paragraphs[0]._id],
        originalAuthor: _ids.users.dev._id,
      });

      const page_covid_2019 = new Page({
        _id: _ids.pages.page_covid_2019._id,
        title: "Coronavirus Disease 2019 (COVID-19)",
        slug: "Coronavirus_Disease_2019_(COVID-19)",
        paragraphs: [
          _ids.pages.page_covid_2019.paragraphs[0]._id,
          _ids.pages.page_covid_2019.paragraphs[1]._id,
        ],
        originalAuthor: _ids.users.dev._id,
      });

      const page_covid_19_transmission = new Page({
        _id: _ids.pages.page_covid_19_transmission._id,
        title: "COVID-19 Transmission",
        slug: "COVID-19_Transmission",
        paragraphs: [_ids.pages.page_covid_19_transmission.paragraphs[0]._id],
        originalAuthor: _ids.users.dev._id,
      });

      const page_covid_19_symptoms = new Page({
        _id: _ids.pages.page_covid_19_symptoms._id,
        title: "COVID-19 Symptoms",
        slug: "COVID-19_Symptoms",
        paragraphs: [_ids.pages.page_covid_19_symptoms.paragraphs[0]._id],
        originalAuthor: _ids.users.dev._id,
      });

      const page_covid_19_pandemic = new Page({
        _id: _ids.pages.page_covid_19_pandemic._id,
        title: "COVID-19 Pandemic",
        slug: "COVID-19_Pandemic",
        paragraphs: [_ids.pages.page_covid_19_pandemic.paragraphs[0]._id],
        originalAuthor: _ids.users.dev._id,
      });

      const page_covid_19_masks = new Page({
        _id: _ids.pages.page_covid_19_masks._id,
        title: "COVID-19 Masks",
        slug: "COVID-19_Masks",
        paragraphs: [_ids.pages.page_covid_19_masks.paragraphs[0]._id],
        originalAuthor: _ids.users.dev._id,
      });

      const page_covid_19_deaths = new Page({
        _id: _ids.pages.page_covid_19_deaths._id,
        title: "COVID-19 Deaths",
        slug: "COVID-19_Deaths",
        paragraphs: [_ids.pages.page_covid_19_deaths.paragraphs[0]._id],
        originalAuthor: _ids.users.dev._id,
      });

      const page_covid_19_testing = new Page({
        _id: _ids.pages.page_covid_19_testing._id,
        title: "COVID-19 Testing",
        slug: "COVID-19_Testing",
        paragraphs: [_ids.pages.page_covid_19_testing.paragraphs[0]._id],
        originalAuthor: _ids.users.dev._id,
      });

      const page_covid_19_rt_pcr_test = new Page({
        _id: _ids.pages.page_covid_19_rt_pcr_test._id,
        title: "COVID-19 RT-PCR Test",
        slug: "COVID-19_RT-PCR_Test",
        paragraphs: [_ids.pages.page_covid_19_rt_pcr_test.paragraphs[0]._id],
        originalAuthor: _ids.users.dev._id,
      });

      const page_rt_pcr_cycle_threshold = new Page({
        _id: _ids.pages.page_rt_pcr_cycle_threshold._id,
        title: "RT-PCR Cycle Threshold",
        slug: "RT-PCR_Cycle_Threshold",
        paragraphs: [_ids.pages.page_rt_pcr_cycle_threshold.paragraphs[0]._id],
        originalAuthor: _ids.users.dev._id,
      });

      const pages = {
        page_sars_cov_2,
        page_covid_2019,
        page_covid_19_transmission,
        page_covid_19_symptoms,
        page_covid_19_pandemic,
        page_covid_19_masks,
        page_covid_19_deaths,
        page_covid_19_testing,
        page_covid_19_rt_pcr_test,
        page_rt_pcr_cycle_threshold,
      };

      for (let i = 0; i < Object.values(pages).length; i++) {
        const page = await Page.create(Object.values(pages)[i]);
        await page.save();
      }

      resolve(pages);
    } catch (e) {
      reject(e);
    }
  });
};

export default createPages;
