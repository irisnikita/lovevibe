// Libraries
import React, {useState} from 'react';

// Icons
import {Success} from '~/icons';

// Components
import {Button, Card, Flex, Input, Form} from '~/components/ui';

// Types
import type {ButtonProps, CardProps, InputProps} from '~/components/ui';

type FieldType = {
  email: string;
};

interface EmailSubmitCardProps {
  cardProps?: CardProps;
  inputProps?: InputProps;
  buttonProps?: ButtonProps;
  onSubmit?: (values: FieldType) => void;
}

export const EmailSubmitCard: React.FC<EmailSubmitCardProps> = (props) => {
  const {cardProps, inputProps, buttonProps, onSubmit} = props;
  const {placeholder = 'Enter Your Email', ...restInputProps} =
    inputProps || {};
  const {children = 'Submit', ...restButtonProps} = buttonProps || {};

  const [form] = Form.useForm<FieldType>();

  const [buttonState, setButtonState] = useState({
    isLoading: false,
    isSuccess: false,
  });

  // Handlers
  const onFinish = (values: FieldType) => {
    setButtonState({
      ...buttonState,
      isLoading: true,
    });

    onSubmit && onSubmit(values);

    setTimeout(() => {
      setButtonState({
        ...buttonState,
        isLoading: false,
        isSuccess: true,
      });
    }, 2000);
  };

  return (
    <Card
      {...cardProps}
      className="w-full md:w-fit"
      classNames={{
        ...cardProps?.classNames,
        body: `${
          cardProps?.classNames?.body || ''
        } md:!px-6 md:!pt-10 md:!pb-4`,
      }}
    >
      <Flex className="!flex-col md:!flex-row md:gap-4">
        <Form<FieldType>
          form={form}
          initialValues={{
            email: '',
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
              {
                type: 'email',
                message: 'Email is incorrect. Please check again',
              },
            ]}
          >
            <Input
              {...restInputProps}
              readOnly={buttonState.isSuccess}
              allowClear
              placeholder={placeholder}
              className="md:!w-[285px]"
            />
          </Form.Item>
        </Form>

        <Button
          {...restButtonProps}
          type="primary"
          className={`${
            buttonState.isSuccess ? 'pointer-events-none !bg-success' : ''
          } !flex min-w-[195px] items-center justify-center`}
          loading={buttonState.isLoading}
          onClick={() => form.submit()}
        >
          {buttonState.isSuccess ? (
            <Flex gap={8} align="center">
              Sent <Success />
            </Flex>
          ) : (
            children
          )}
        </Button>
      </Flex>
    </Card>
  );
};
