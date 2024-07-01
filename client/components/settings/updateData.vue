<script setup lang="ts">
import { lazy, object, string, mixed, type InferType, ref as yupRef } from "yup"
import type { FormSubmitEvent } from "#ui/types"

const userStore = useUserStore()
const isShowConfirmCode = ref(false)

const state = reactive({
  email: "",
  password: "",
  confirmPassword: "",
})

const schema = lazy((value) =>
  object().shape({
    email:
      value.email?.length > 0
        ? string().email().label("email required")
        : mixed(),
    password:
      value.password?.length > 0
        ? string().nullable().notRequired().min(6).label("password required")
        : mixed(),
    confirmPassword: string()
      .oneOf([yupRef("password"), ""], "Passwords must match")
      .label("confirmPasswordm"),
  }),
)

type Schema = InferType<typeof schema>

const tempUpdateData = {}

function onUpdateUserData(event: FormSubmitEvent<Schema>) {
  userStore.sendConfirmCode(userStore.data?.email)
  isShowConfirmCode.value = true
  Object.assign(tempUpdateData, event.data)
}

async function onConfirmUpdateUserData(confirmCode: string) {
  const resStatus = await userStore.updateUserData({
    ...tempUpdateData,
    confirmCode,
  })

  if (resStatus) {
    isShowConfirmCode.value = false
  }
}

function onReset() {
  isShowConfirmCode.value = false
}
</script>

<template>
  <UserConfirmCode
    v-if="isShowConfirmCode"
    :on-send="onConfirmUpdateUserData"
    @on-reset="onReset"
  />
  <div v-else>
    <UForm
      :schema="schema"
      :state="state"
      class="space-y-2 mb-2"
      @submit="onUpdateUserData"
    >
      <UFormGroup label="Email" name="email">
        <UInput
          v-model="state.email"
          color="white"
          :placeholder="userStore.data?.email"
        />
      </UFormGroup>

      <UFormGroup label="Password" name="password">
        <UInput
          v-model="state.password"
          type="password"
          class="input"
          placeholder="**********"
        />
      </UFormGroup>

      <UFormGroup label="Confirm password" name="confirmPassword">
        <UInput
          v-model="state.confirmPassword"
          type="password"
          class="input"
          placeholder="Confirm password"
        />
      </UFormGroup>

      <UButton type="submit" class="block mx-auto mt-4 py-2"> Change </UButton>
    </UForm>
  </div>
</template>

<style lang="scss" scoped></style>
