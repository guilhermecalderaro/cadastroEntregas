import { useState } from 'react';

function useForm(initValues) {
  const [values, setValues] = useState(initValues);

  function setValue(key, value) {
    setValues({
      ...values,
      [key]: value,
    });
  }

  function clearForm() {
    setValues(initValues);
  }

  function handleChange(e) {
    setValue(
      e.target.getAttribute('name'),
      e.target.value,
    );
  }

  return {
    values,
    handleChange,
    clearForm,
    setValue,
  };
}

export default useForm;
