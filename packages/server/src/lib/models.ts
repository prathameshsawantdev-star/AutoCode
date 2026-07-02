import { findSupportedChatModel, type SupportedChatModel, type SupportedChatModelId, type SupportedProvider } from "@autocode/shared";
import type { LanguageModel, Provider } from "ai"
import { anthropic } from "@ai-sdk/anthropic"
import { openai } from "@ai-sdk/openai"
import { google } from "@ai-sdk/google"

type AnthropicModelId = Extract<SupportedChatModel, { provider: "anthropic"}>["id"]
type OpenAIModelId = Extract<SupportedChatModel, { provider: "openai"} >["id"]
type GoogleModelId = Extract<SupportedChatModel, { provider: "google"}>["id"]

export type ResolveModel = {
    model: LanguageModel,
    provider: SupportedProvider,
    modelId: SupportedChatModelId 
}

function assertUnsupportedProvider(provider: string): never {
    throw new Error(`Unsupported Ai provider ${provider}`)
}

function resolveAnthropicModel(modelId: AnthropicModelId): ResolveModel{
    return {
        model: anthropic(modelId),
        provider: "anthropic",
        modelId
    }
}

function resolveOpenAIModel(modelId: OpenAIModelId): ResolveModel{
    return {
        model: openai(modelId),
        provider: "openai",
        modelId
    }
}

function resolveGoogleModel(modelId: GoogleModelId): ResolveModel{
    return {
        model: google(modelId),
        provider: "google",
        modelId
    }
}

function resolveSupportedChatModel(model: SupportedChatModel): ResolveModel{
    const provider = model.provider
    switch(provider){
        case "anthropic":
            return resolveAnthropicModel(model.id)
        case "openai":
            return resolveOpenAIModel(model.id)
        case "google":
            return resolveGoogleModel(model.id)
        defaut:
            return assertUnsupportedProvider(provider)
    }
}

export function isSupportedChatModel(modelId: string): modelId is SupportedChatModelId {
    return findSupportedChatModel(modelId) != null 
}

export function resolveChatModel(modelId: string): ResolveModel{
    const model = findSupportedChatModel(modelId)
    if(!model){
        throw new Error(`Unsupported model ${modelId}`)
    }
    return resolveSupportedChatModel(model)
}



