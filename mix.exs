defmodule PhoenixTypedHook.MixProject do
  use Mix.Project

  def project do
    [
      app: :phoenix_typed_hook,
      version: "0.0.1",
      elixir: "~> 1.0",
      build_embedded: false,
      start_permanent: false,
      description: description(),
      package: package(),
      deps: deps(),
      docs: docs(),
      name: "Phoenix Typed Hook",
      source_url: "https://github.com/guisehn/phoenix_typed_hook"
    ]
  end

  def application do
    []
  end

  defp deps do
    [
      {:ex_doc, "~> 0.28", only: :dev, runtime: false}
    ]
  end

  defp docs do
    [
      main: "readme",
      extras: ["README.md"]
    ]
  end

  defp description do
    "Write your Phoenix LiveView client hooks using typed classes, with or without TypeScript"
  end

  defp package do
    [
      name: "phoenix_typed_hook",
      files: ~w(priv mix.exs package.json README* LICENSE*),
      licenses: ["MIT"],
      links: %{"GitHub" => "https://github.com/guisehn/phoenix_typed_hook"}
    ]
  end
end
