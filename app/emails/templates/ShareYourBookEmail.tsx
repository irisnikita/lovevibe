// Libraries
import React from 'react';
import {
  Button,
  Head,
  Html,
  Preview,
  Tailwind,
  Body,
  Img,
  Container,
  Heading,
  Section,
  Row,
  Column,
  Text,
  Link,
} from '@react-email/components';

// Image
import LovevibeLogo from 'public/images/logos/lovevibe.png';
import {TailWindProvider} from '../provider/tailwindProvider';

interface ShareYourBookProps {
  preview?: string;
}

export const ShareYourBookEmail: React.FC<ShareYourBookProps> = (props) => {
  const {preview = 'Your book is ready!', ...restProps} = props;

  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <TailWindProvider>
        <Body className="bg-slate-50 py-5 font-sans text-base">
          <Img
            src={LovevibeLogo}
            width={75}
            height={48}
            alt="Lovevibe"
            className="mx-auto my-5"
          />
          <Container className="bg-white p-11">
            <Heading className="my-0 text-center leading-8">
              You have received the book from your relative
            </Heading>

            <Section>
              <Row>
                <Text className="text-base">
                  {`Congratulations, you have received the book from your relative. Please view and download the book in pdf format in the attachments section
`}
                </Text>

                <Text className="text-center text-base font-bold">{`Your book is ready !`}</Text>
              </Row>
            </Section>

            {/* <ul>{steps?.map(({Description}) => Description)}</ul> */}

            <Section className="text-center">
              <Link
                href="https://app.lovevibe.co/your-book"
                className="rounded-lg bg-primary px-[18px] py-3 text-white"
              >
                Go to custom your book
              </Link>
            </Section>

            {/* <Section className="mt-45">
              <Row>
                {links?.map((link) => (
                  <Column key={link}>
                    <Link className="font-bold text-black underline">
                      {link}
                    </Link>{' '}
                    <span className="text-green-500">→</span>
                  </Column>
                ))}
              </Row>
            </Section> */}
          </Container>

          <Container className="mt-20">
            {/* <Section>
              <Row>
                <Column className="px-20 text-right">
                  <Link>Unsubscribe</Link>
                </Column>
                <Column className="text-left">
                  <Link>Manage Preferences</Link>
                </Column>
              </Row>
            </Section> */}
            <Text className="mb-10 text-center text-gray-400">
              9169 W State St #2259, Garden City Idaho 83714, United States
            </Text>
          </Container>
        </Body>
      </TailWindProvider>
    </Html>
  );
};
