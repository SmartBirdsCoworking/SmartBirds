import { Banner, Button, Image, Section } from '@xelene/tgui';

const PARTNER_LINK = './partner';
const HOME_LINK = './';
const DEMO_LINK = './demo';


export const PartnersList = () => (
  <>
      <Section header="Services">
        <Banner
          before={<Image
           size={96}
           src="https://static.tildacdn.one/tild6361-3139-4330-b064-393537376230/SB-Brandmark-Black_2.png"
           />}
          header="Smart Birds Coworking"
          subheader="Workspace rent in Kuşadası for digital nomads and remote workers.  24/7 access, high-speed internet, coffee, and tea."
        >
          <Button
            size="s"
            Component="a"
            href={`${PARTNER_LINK}?partner=smartbirds`}
          >
            Info
          </Button>
          <Button
            size="s"
            Component="a"
            href={HOME_LINK}
          >
            QR Code
          </Button>
        </Banner>
        <Banner
          before={<Image
           size={96}
           src="https://img1.wsimg.com/isteam/ip/7222a9f6-7043-4e5d-b301-bcebdeb42ceb/0001.jpg/:/rs=w:353,h:250,cg:true,m/cr=w:353,h:250/qt=q:95"
           />}
          header="Izolcar"
          subheader="Car rental in Kuşadası"
        >
          <Button
            size="s"
            Component="a"
            href={`${PARTNER_LINK}?partner=izolcar`}
          >
            Info
          </Button>
          <Button
            size="s"
            Component="a"
            href={HOME_LINK}
          >
            QR Code
          </Button>
        </Banner>

      </Section>
      <Section header="Food">
        <Banner
          before={<Image
           size={96}
           src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSows_KaeQ68F0MOny-uRTws7P-ijp6mUPrwQ&s"
           />}
          header="Köfteci Yusuf"
          subheader="Köfteci Yusuf"
        >
          <Button
            size="s"
            Component="a"
            href={`${PARTNER_LINK}?partner=kofteciyusuf`}
          >
            Info
          </Button>
          <Button
            size="s"
            Component="a"
            href={DEMO_LINK}
          >
            QR Code
          </Button>
        </Banner>
      </Section>
  </>
);
