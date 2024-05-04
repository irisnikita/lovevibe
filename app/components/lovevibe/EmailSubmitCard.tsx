// Libraries
import React, {useMemo, useState} from 'react';

// Icons
import {Success} from '~/icons';

// Components
import {Button, Card, Flex, Input, Form} from '~/components/ui';

// Types
import type {ButtonProps, CardProps, InputProps} from '~/components/ui';
import {useUpdateEffect} from '~/hooks';

type FieldType = {
  email: string;
};

interface EmailButtonProps extends ButtonProps {
  loading?: boolean;
}

interface EmailSubmitCardProps {
  cardProps?: CardProps;
  inputProps?: InputProps;
  buttonProps?: EmailButtonProps;
  onSubmit?: (values: FieldType) => void;
}

export const EmailSubmitCard: React.FC<EmailSubmitCardProps> = (props) => {
  const {cardProps, inputProps, buttonProps, onSubmit} = props;
  const {placeholder = 'Enter Your Email', ...restInputProps} =
    inputProps || {};
  const {
    children = 'Submit',
    loading: buttonLoading,
    ...restButtonProps
  } = buttonProps || {};
  const [form] = Form.useForm<FieldType>();

  const [isSuccess, setSuccess] = useState(false);

  useUpdateEffect(() => {
    if (!buttonLoading) {
      setSuccess(true);
    }
  }, [buttonLoading]);

  // Handlers
  const onFinish = (values: FieldType) => {
    onSubmit && onSubmit(values);
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
              readOnly={isSuccess}
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
            isSuccess ? 'pointer-events-none !bg-success' : ''
          } !flex min-w-[195px] items-center justify-center`}
          loading={buttonLoading}
          onClick={() => form.submit()}
        >
          {isSuccess ? (
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
